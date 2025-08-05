const Header = ({course}) => {
  return(
    <div>
        <h2>{course}</h2>
    </div>
  )

}

const Part = ({name, exercises}) => {
  return(
    <div>
        <p>{name} {exercises}</p>
    </div>
  )
}


const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => {
       return <Part key={part.id} name={part.name} exercises={part.exercises}/>
      })}
    </div>
  )
}

const Total = ({parts}) => {
  return(
    <div>
      <h3>total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</h3>
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





