interface GraphQlResponse<T> {
  data: {
    [key: string]: T
  }
}
