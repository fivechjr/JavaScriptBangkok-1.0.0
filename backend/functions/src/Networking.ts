import admin from 'firebase-admin'
import { NetworkingProfile, ProfileData } from './Authentication'
import { getEnvDoc, getEnvRef } from './FirebaseSetup'

const onlyUnique = (value: any, index: any, self: any) =>
  self.indexOf(value) === index

export type Network = {
  uid: string
  name: string
  badge: number
}

export const badges = [
  {
    id: 1,
    name: 'React',
  },
  {
    id: 2,
    name: 'TypeScript',
  },
  {
    id: 3,
    name: 'JavaScript',
  },
]

export const initializeNetworkingProfile = async (
  env: string,
  userID: string,
) => {
  const user = await getUserProfile(env, userID)
  const networkingProfile: NetworkingProfile = {
    firstname: user.firstname,
    lastname: user.lastname,
    networks: [],
    badge: getRandomBadge(),
    bio: '',
  }
  await getEnvDoc(env)
    .collection('networkingProfiles')
    .doc(userID)
    .set(networkingProfile)
  return true
}

export const getNetworkingProfile = async (env: string, userID: string) => {
  return (
    await getEnvDoc(env)
      .collection('networkingProfiles')
      .doc(userID)
      .get()
  ).data() as NetworkingProfile
}

export const getUserProfile = async (env: string, userID: string) => {
  return (
    await getEnvDoc(env)
      .collection('profiles')
      .doc(userID)
      .get()
  ).data() as ProfileData
}

export const createNetwork = async (
  env: string,
  targetUserID: string,
  user: Network,
) => {
  await getEnvDoc(env)
    .collection('networkingProfiles')
    .doc(targetUserID)
    .update({
      networks: admin.firestore.FieldValue.arrayUnion(user),
    })
  return true
}

export const willSastifyWinningCondition = (
  user: NetworkingProfile,
  nextUser: Network,
) => {
  let currentBadges = user.networks.map(network => network.badge)
  currentBadges.push(user.badge)
  currentBadges.push(nextUser.badge)
  currentBadges = currentBadges.filter(onlyUnique)
  const isSastified = currentBadges.sort().join('.') === badges.sort().join('.')
  return isSastified
}

export const editBio = async (env: string, userID: string, bio: string) => {
  await getEnvDoc(env)
    .collection('networkingProfiles')
    .doc(userID)
    .set({
      bio,
    })
  return true
}

export const addEventWinner = async (env: string, userID: string) => {
  await getEnvRef(env)
    .child('networking')
    .child('winners')
    .child(userID)
    .set(new Date())
}

export const getRandomBadge = () =>
  badges[Math.floor(Math.random() * badges.length)].id
