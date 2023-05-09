 // Render Prop
 import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
  import {object, string} from "yup";

// create input schema for validatio
 let BotSchema = object().shape({
  name: string().required(),
  value: string().required(),
  color: string().required(),
})

 
 
const printValues = (values) => {
  console.log("Values", values)
}

 const InputForm = () => {
  return (
     <div>
     <h1>Any place in your app!</h1>
     <Formik
       initialValues={{ name: '', value: '0', colors: 'red' }}
       validationSchema={BotSchema}
       handleChange={printValues}
       onSubmit={values => {
         console.log(values)
       }}
     >
       {({ errors, touched, isSubmitting }) => (
         <Form>
            <div>
              <Field type="text" name="name" />

              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
            </div>


           <Field name="value" label="Bot Value"  as="select" className="">
             <option value="0">0</option>
             <option value="1">1</option>
           </Field>
           
           <ErrorMessage name="value" component="div" />

           <Field name="colors" labe="Bot Color" as="select" className="">
             <option value="red">Red</option>
             <option value="green">Green</option>
             <option value="blue">Blue</option>
           </Field>
        
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
     
   </div>
  )
};

 export default InputForm;