import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import User from 'src/models/User'
import { dbConnector } from 'src/utils/dbConnector'

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

        if (!user) {
          throw new Error('Email is not registered')
        }

        const isPasswordCorrect = await compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect')
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
    jwt: async ({ token, user }) => {
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
