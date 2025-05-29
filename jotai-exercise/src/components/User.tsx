import { useState, type ChangeEvent } from 'react'
import {
    firstnameAtom, 
    lastnameAtom, 
    ageAtom, 
    hobbiesAtom
} from '../atoms/user.atom';

import { useAtom } from 'jotai';

export interface User {
    firstname: string;
    lastname: string;
    age: number;
    hobbies: string[];
}

const Hobbies = [
  {
    key: 'listenMusic',
    value: 'Listen Music'
  },
  {
    key: 'sport',
    value: 'Sport'
  },
  {
    key: 'netflix',
    value: 'Netflix'
  },
]

export default function User() {
    const [firstname, setFirstname] = useAtom(firstnameAtom)
    const [lastname, setLastname] = useAtom(lastnameAtom)
    const [age, setAge] = useAtom(ageAtom)
    const [hobbies, setHobbies] = useAtom(hobbiesAtom)
    const [user, setUser] = useState<User>({
        firstname: '',
        lastname: '',
        age: 0,
        hobbies: []
    })
    
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
    
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }    

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target

        setUser(prevState => {
            const updatedHobbies = checked
                ? [...prevState.hobbies, value]
                : prevState.hobbies.filter(hobby => hobby !== value)

            return {
                ...prevState,
                hobbies: updatedHobbies
            }
        })
    }

    const handleSubmit = () => {
        setFirstname(user.firstname)
        setLastname(user.firstname)
        setAge(user.age)
        setHobbies(user.hobbies)
    }

  return (
    <>
        <p>First Name: {firstname}</p>
        <p>Last Name: {lastname}</p>
        <p>Age: {String(age)}</p>
        <p>Hobbies: {hobbies.join(',')}</p>

        <hr />

        <div>
          <label htmlFor="firstname">First Name:</label>
          <input 
            type="text" 
            id="firstname" 
            name="firstname" 
            value={user.firstname} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input 
            type="text" 
            id="lastname" 
            name="lastname" 
            value={user.lastname} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            min="0"
            value={user.age} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Hobbies:</label>
          {
            Hobbies.map((hobby, index) => <div key={index}>
                    <input 
                        type="checkbox" 
                        id={hobby.key} 
                        name="hobbies" 
                        value={hobby.value} 
                        checked={user.hobbies.includes(hobby.value)}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor={hobby.key} >{hobby.value}</label>
                </div>
            )
        }
        </div>
        <button onClick={handleSubmit}>
            Submit
        </button>
    </>
  )
}