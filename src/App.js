// import React, { Component } from 'react'
// // import PropTypes from 'prop-types'
// // import Select from 'react-select'
// import axios from 'axios'
// import { Select } from 'grommet'

// // import makeAnimated from 'react-select/animated'
// // const animatedComponents = makeAnimated()
// const OPTIONS = ['First', 'Second', 'Third']

// export default class App extends Component {
//   // static propTypes = {
//   //   prop: PropTypes,
//   // }

//   state = {
//     option: [],
//     value: [],
//     universities: [],
//     selectedOption: [],
//     university: {
//       required_essays: [],
//       supplements: [],
//     },
//   }

// componentDidMount() {
//   axios
//     .get('http://localhost:8000/universities')
//     .then(response => {
//       this.setState({ universities: response.data })
//     })
//     .catch(err => {
//       console.log('tried')
//       console.error(err)
//     })
// }

//   componentDidUpdate() {}

//   handleChange = selectedOption => {
//     this.setState({ selectedOption }, () => {
//       console.log(`Option selected:`, this.state.selectedOption)
//       if (Object.keys(this.state.selectedOption).length) {
//         axios
//           .get(
//             `https://content-staging.prompt.com/api/data/university/${this.state.selectedOption.value}`,
//             {
//               headers: {
//                 Authorization: 'Token 9e70f6d0114903e346004714595e80c5c7fdc3dc',
//               },
//             }
//           )
//           .then(res => this.setState({ university: res.data }))
//       }
//     })
//   }

//   // render() {
//   //   const { options, value } = this.state;
//   //   return (
//   //     <SandboxComponent>
//   // <Select
//   //   multiple={true}
//   //   value={value}
//   //   onSearch={(searchText) => {
//   //     const regexp = new RegExp(searchText, 'i');
//   //     this.setState({ options: OPTIONS.filter(o => o.match(regexp)) });
//   //   }}
//   //   onChange={event => this.setState({
//   //     value: event.value,
//   //     options: OPTIONS,
//   //   })}
//   //   options={options}
//   // />
//   //     </SandboxComponent>
//   //   );
//   // }
//   render() {
//     console.log('STATE 🦄'.this.state)
//     //   const { options, value } = this.state;
//     const { value } = this.state
//     console.log('rendering')
//     console.log(this.state.universities, 'univ')
//     // return <pre>{JSON.stringify(this.state, null, 2)}</pre>
//     const options =
//       this.state.universities &&
//       this.state.universities.length &&
//       this.state.universities.map(university => ({
//         label: university.name,
//         value: university.iped,
//       }))

//     return (
//       <div>
//         {/* <Select
//           options={options}
//           components={animatedComponents}
//           onChange={this.handleChange}
//           closeMenuOnSelect={true}
//         /> */}
//         <Select
//           options={['small', 'medium', 'large']}
//           value={value}
//           onChange={({ option }) => this.setState({ option })}
//         />
//         <pre>{JSON.stringify(this.state.university, null, 2)}</pre>
//       </div>
//     )
//   }
// }

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// import { Box, Grommet, Select } from 'grommet'
// import { grommet } from 'grommet/themes'

// const App = ({ theme, ...rest }) => {
//   const [value, setValue] = useState([])
//   const [options, setOptions] = useState([])
//   const [filter, setFilter] = useState([])
//   useEffect(() => {
//     axios
//       .get('http://localhost:8000/universities')
//       .then(response => {
//         setOptions(response.data.map(ele => ele.name))
//       })
//       .catch(err => {
//         console.error(err)
//       })
//   }, [])

//   return (
//     <Grommet full theme={theme || grommet}>
//       <Box fill align='center' justify='start' pad='large'>
//         <Select
//           options={options}
//           value={value}
//           onChange={({ option }) => setValue(option)}
//           dropHeight='medium'
//           placeholder='Select a university'
//           searchPlaceholder='Search for a university'
//           onClose={() => setOptions(options)}
//           onSearch={text => {
//             // The line below escapes regular expression special characters:
//             // [ \ ^ $ . | ? * + ( )
//             const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

//             // Create the regular expression with modified value which
//             // handles escaping special characters. Without escaping special
//             // characters, errors will appear in the console
//             const exp = new RegExp(escapedText, 'i')
//             console.log('REG exp', exp, options)
//             setOptions(options.filter(o => exp.test(o)))
//           }}
//         />
//       </Box>
//     </Grommet>
//   )
// }

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Grommet, Select } from 'grommet'
import { grommet } from 'grommet/themes'

const objectOptions = []
for (let i = 1; i <= 200; i += 1) {
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0,
  })
}

const App = () => {
  const [options, setOptions] = useState([])
  const [defaultOptions, setDefaults] = useState([])
  const [value, setValue] = useState('')
  const [university, setUniversity] = useState({})
  const [objects, setObjects] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/universities')
      .then(response => {
        setObjects(
          response.data.map(ele => ({
            value: ele.iped,
            label: ele.name,
          }))
        )
        setDefaults(response.data.map(ele => ele.name))
        setOptions(response.data.map(ele => ele.name))
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    console.log('VALUE', value, objects.length)
    if (!!value && parseInt(objects.length)) {
      console.log(
        'university to search',
        objects.find(obj => obj.label === value)['value']
      )
      axios
        .get(
          `https://content-staging.prompt.com/api/data/university/${
            objects.find(obj => obj.label === value)['value']
          }`,
          {
            headers: {
              Authorization: `Token ${process.env.REACT_APP_PROMPT_TOKEN}`,
            },
          }
        )
        .then(res => setUniversity(res.data))
    }
  }, [value])

  return (
    <Grommet full theme={grommet}>
      <Box align='center' justify='start' pad='medium'>
        <Select
          size='medium'
          dropHeight='medium'
          placeholder='Select a university'
          searchPlaceholder='Search a university'
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          onClose={() => setOptions(defaultOptions)}
          onSearch={text => {
            // The line below escapes regular expression special characters:
            // [ \ ^ $ . | ? * + ( )
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

            // Create the regular expression with modified value which
            // handles escaping special characters. Without escaping special
            // characters, errors will appear in the console
            const exp = new RegExp(escapedText, 'i')
            setOptions(defaultOptions.filter(o => exp.test(o)))
          }}
        />
      </Box>
      <pre>{JSON.stringify(university, null, 2)}</pre>
    </Grommet>
  )
}
export default App
