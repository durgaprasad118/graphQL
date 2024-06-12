import { buildSchema } from 'graphql'

const schema = buildSchema(`
type Course{
 id: ID
courseName: String 
category :String 
price : Int 
language : String 
email : String
teachingAssists: [TeachAssist]
}

type TeachAssist {
name: String 
level :Int
}
type Query {
 getCourse(id:ID): Course
}
input CourseInput{
    id: ID
courseName: String! 
category :String 
price : Int! 
language : String 
email : String
teachingAssists: [TeachAssist]
}
input TeachAssist{
    name: String 
level :Int
}
type Mutation{
    createCourse(input:CourseInput): Course
}
`)

export default schema
