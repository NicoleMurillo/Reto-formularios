import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});  
  const [validationStates, setValidationStates] = useState({emailState: false, passwordState: false});  


  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {
    const passwordValue = e.target.value;
    setFormValues({...formValues, password: e.target.value})

    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d).{9,}$/.test(passwordValue);
    setValidationStates({...validationStates, passwordState: isValidPassword});
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = /@gmail\.com$/.test(formValues.email);
    setValidationStates({...validationStates, emailState: isValidEmail});

    if (isValidEmail && validationStates.passwordState){
      alert("Valid form.");
    } else {
      alert("Your email should follow an established format.");
    }
  }
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    //Call fetch
    alert(JSON.stringify(formValues))
  })

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleEmailChange}
          value={formValues.email}
          />
          {!validationStates.emailState && formValues.email && (
            <Form.Text className="text.muted">
              El correo debe tener un formato válido.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
          />
          {!validationStates.passwordState && formValues.password && (
            <Form.Text className="text-muted">
              La contraseña debe tener números, letras y ser al menos 9 caracteres de largo.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={(e) => handleSelectChange(e)}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;