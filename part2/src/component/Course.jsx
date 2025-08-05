const Header = ({course}) => {
  return(
    <div>
        <h1>{course}</h1>
    </div>
  )

}

const Part = ({part, exercises}) => {
  return(
    <div>
        <p>{part} {exercises}</p>
    </div>
  )
}


const Content = ({parts}) => {
  return(
    <div>
        <Part part={parts[0].name} exercises={parts[0].exercises} />
        <Part part={parts[1].name} exercises={parts[0].exercises} />
        <Part part={parts[2].name} exercises={parts[0].exercises} />
    </div>
  )
}

const Total = ({parts}) => {
  return(
    <div>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </div>
  )
}


const Course= ({course}) => {
    return(
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course





