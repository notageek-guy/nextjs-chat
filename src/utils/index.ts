export const getOtherEmail = (users: any, currentUser: any) => {
  return users?.filter((user: any) => user !== currentUser?.email)[0];
};
