import User from "./user"

export default interface SearchResponse{
    isFirst:boolean,
        isLoading:boolean,
        isError:boolean,
        users:User[]
}