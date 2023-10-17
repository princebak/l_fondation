import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import User from 'src/models/User'
import { dbConnector } from 'src/utils/dbConnector'
import { CREATED } from 'src/utils/constant'
import { SENDGRID_USER_KEY } from 'src/utils/constant'
import * as sgMail from '@sendgrid/mail'
import { generateUserPin } from 'src/utils/pinGenerator'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        console.log('******** credentials **********')
        console.log(credentials)

        await dbConnector()

        const user = await User.findOne({
          email: credentials.email
        }).select('+password')

        console.log('User >> ', user)

        if (!user) {
          throw new Error('Email is not registered')
        }

        const isPasswordCorrect = await compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect')
        }
        let userPin = null

        if (user.status === CREATED) {
          userPin = await generateUserPin()

          const msg = {
            to: user.email,
            from: 'bakengailunga@gmail.com',
            subject: "L-Fondation validation de l'E-mail",
            text: 'Bienvenue chez Lingomba Fondation',
            html: 'Bienvenue chez Lingomba Fondation, validez vorte email avec ce code : ' + userPin
          }

          sgMail.setApiKey('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') // SENDGRID_USER_KEY
          await sgMail.send(msg)

          await User.findOneAndUpdate({ _id: user._id }, { pin: userPin })
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        user = session.user
      }
      user && (token.user = user)

      return token
    },
    session: async ({ session, token }) => {
      const user = token.user
      session.user = user

      return session
    }
  },
  jwt: {
    secret: '$2b$10$8KMPRzUEQ.7flfiT7FVf3.4AKnerb9BsblPqanw.M44nOReKoh6wu'
  },
  secret: '*DeliveryApp@2023*' //Authentication secret
})

/*
          const emailPayload = { email: user.email, userPin: userPin }

          console.log('emailPayload >> ', emailPayload)

          const response = await fetch('http://localhost:3000/api/send_code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailPayload)
          })
          const res = await response.json()
          console.log('User response >> ', res) */
