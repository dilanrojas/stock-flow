export type CategoryResponse = {
  name: string;
  imageUrl : string
  productCount : number
  resourceId: string;
};

export type CategoryRequest = {
  name: string;
  imageURL : string
};
