import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'
import { act } from 'react-dom/test-utils'

test('ContactForm renders without errors', ()=> {
    render(<ContactForm />)
})


test('can type into all inputs and submit form properly', async ()=> {
    render(<ContactForm />)

   const fNameInput = screen.getByLabelText(/first name/i)
   const lNameInput = screen.getByLabelText(/last name/i)
   const emailInput = screen.getByLabelText(/email/i)
   const messageInput = screen.getByLabelText(/message/i)

   userEvent.type(fNameInput, 'john')
   userEvent.type(lNameInput, 'chamberlin')
   userEvent.type(emailInput, 'winman@gmail.com')
   userEvent.type(messageInput, 'splooie')

   const submitButton = screen.getByRole('button')
   userEvent.click(submitButton)

   const newFName = await screen.findByText(/john/i)
   const newLName = await screen.findByText(/chamberlin/i)
   const newEmail = await screen.findByText(/winman@gmail.com/i)
   const newMessage = await screen.findByText(/splooie/i)

   expect(newFName).toBeInTheDocument()
   expect(newLName).toBeInTheDocument()
   expect(newEmail).toBeInTheDocument()
   expect(newMessage).toBeInTheDocument()
})


describe('form validation works properly', ()=> {

    test('maxLength error works properly', async()=> {
        render( <ContactForm />)

        const submitButton =  screen.getByRole('button')
        const fNameInput = screen.getByLabelText(/first name/i)

        await act(async()=> {
            userEvent.type(fNameInput, 'ooga booga caveman')
            userEvent.click(submitButton)
        })
        const maxLengthError = await screen.findByText(/looks like there was an error: maxlength/i)
        expect(maxLengthError).toBeInTheDocument()
    })

    test('x is required erros work properly', async()=> {
        render(<ContactForm />)
        
        const submitButton = screen.getByRole('button')

        await act(async()=> {
            userEvent.click(submitButton)
        })
        const requiredErrors = await screen.findAllByText(/looks like there was an error: required/i)
        expect(requiredErrors).toBeTruthy()
    })
})


