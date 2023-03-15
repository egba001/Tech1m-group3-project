import React,{useState} from 'react'
import logo from '../assets/images/logos/white.png'
import backgroundImg from '../assets/images/background_images/page2.jpg'
import '../assets/css/global.css'
import { Link } from 'react-router-dom'
import SignInForm from './SignInForm'
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext'

const SignIn = () => {
    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')
    const {signup} =useAuth()

  

    
    const SignupSchema = Yup.object().shape({
        fullname: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
        phone: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(8)
        .required('A phone number is required'),
      });
    const signupInfo=[
        {title:'Enter your fullname',inputType:'text',placeholder:'Adams Chuks',name:'fullname',style:'getStyles(touched.email, "email", errors.email)', errorMessage:'',smallText:'Enter your full name without special character'}
    ]
    function getStyles(errors, fieldName, touched) {
        if (errors, fieldName,touched) {
          return {
            border: '1px solid red'
          }
        }  
      }
  return (

        <div className=' h-screen w-screen'  style={{backgroundImage: `url(${backgroundImg})`,backgroundSize:'cover', backgroundRepeat:'no-repeat' }}>
        <div className='bg-dblue-900 bg-opacity-70 h-full flex flex-col  md:flex-row items-center justify-between px-20'>
            <div className='mt-20 md:mt-0'>
            <img src={logo} alt="background image" />
            </div>
            <Formik
                    initialValues={{
                        email: '',
                        password:'',
                        fullname:'',
                        password:''
                    }}
                    validationSchema={SignupSchema}
                   onSubmit={async(values,{resetForm})=>{
                    console.log(values)
                    setSuccess('')
                          
                    try {
                            setError('')
                            await signup(values.email,values.password)
                            resetForm({values:''})
                            setSuccess('User was added successfully!')
                        } catch{
                            setError('User already exists')
                        }
                        console.log(values)
                   }}
                    
            >
                {({errors, touched, isSubmitting})=>(
            <div className='grid  my-20 md:my-0 md:w-1/2  bg-white-30 h-[70%] py-20 justify-between px-10 items-center '>
                {error?(
                    <p className='text-red h6 text-center'>{error}</p>
                ):null}
                {success?(
                    <p className='text-success h6 text-center'>{success}</p>
                ):null}
                    
                <Form className="flex flex-col w-full md:grid md:grid-cols-2 justify-between gap-y-[1rem] h-full">
                        <div>

                            <SignInForm 
                            title='Fullname'
                            inputType='text'
                            placeholder='Adams Chuks'
                            style={getStyles(touched.fullname, "fullname", errors.fullname)}
                            name='fullname'
                            smalltext='Enter your full name without special character'
                            />
                            {errors.fullname && touched.fullname ? (
                            <p className='text-xs text-error w-[90%] grid justify-left '>{errors.fullname}</p>):
                            <p className='text-xs text-neutral-50 w-[90%] grid justify-left '>Enter your full name without special character</p>
                        }
                        </div>
                        <div>
                                <SignInForm 
                                title='Email Address'
                                inputType='email'
                                placeholder='Adams@gmail.com'
                                style={getStyles(touched.email, "email", errors.email)}
                                name='email'
                                smalltext='Enter your valid email'
                                />
                                {errors.email && touched.email ? (
                            <p className='text-xs text-error w-[90%] grid justify-left '>{errors.email}</p>):
                            <p className='text-xs text-neutral-50 w-[90%] grid justify-left '>Enter your valid email</p>
                        }
                        </div>
                        <div>
                                <SignInForm 
                                title='Password'
                                inputType='password'
                                placeholder='......'
                                name='password'
                                style={getStyles(touched.password, "password", errors.password)}
                                smalltext='Enter strong password'
                                />
                                {errors.password && touched.password ? (
                                    <p className='text-xs text-error w-[90%] grid justify-left '>{errors.password}</p>):
                                    <p className='text-xs text-neutral-50 w-[90%] grid justify-left '>Enter strong password</p>
                                }
                        </div>
                            <div>
                                <SignInForm 
                                title='Phone Number'
                                inputType='text'
                                style={getStyles(touched.phone, "password", errors.phone)}
                                name='phone'
                                placeholder='xxx xxx xxx'
                                smalltext='Enter your phone number with country code'
                                />
                                {errors.phone && touched.phone ? (
                            <p className='text-xs text-error w-[90%] grid justify-left '>{errors.phone}</p>):
                            <p className='text-xs text-neutral-50 w-[90%] grid justify-left '>Enter your valid phone number with country code</p>
                        }
                            </div>
                            <div className='col-span-2 w-[100%] md:w-[95%]  '>
                            <div className="flex mb-1 justify-between">
                                <label htmlFor="" className='text-primary-500 text-xs'>Role</label>
                                <p className='text-primary-200 text-xs'>Details</p>
                            </div>
                            <select name="" id="" className=' items-center bg-white-20 p-1.5 text-primary-200 text-sm px-4 w-full'>
                                <option value="">Instructor</option>
                                <option value="">Recruiter</option>
                                <option value="">student</option>
                            </select>
                            <p className='text-xs text-neutral-50'>Select your role</p>

                            </div>

                            <button className='md:col-span-2 py-1 bg-primary-200 text-white-10 w-[95%]' type='submit' disabled={isSubmitting} >Sign up</button>
                            <p className='text-xs text-center md:col-span-2'>Already have an account! <Link to='/login' className='text-primary-200'>Log in</Link></p>
                    </Form>
                </div>
                )}
            </Formik>

        </div>
        </div>
  )
}

export default SignIn
