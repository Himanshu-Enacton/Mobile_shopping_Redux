export type CustomerDetails = {
  name: string;
  address: string;
  email: string;
};

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
  User: undefined;
  Final: { customerDetails: CustomerDetails };
  UserDetails: undefined;
};
