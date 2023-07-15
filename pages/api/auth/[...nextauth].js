import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Users from '@/models/UserModels';
import { compare } from 'bcrypt';
import connectMongo from '@/lib/dbConnect';

const adminEmails = ['admin@gmail.com']

export const authOptions = {
  // export const authOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  // pages: {
  //     signIn: "/SignIn"
  // },
  providers: [

    CredentialsProvider({
      id: "credentials",
      name: "Credential",
      credentials: {
        email: {
          label: "Email",
          type: "text"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials, req) {
        console.log("authorize")
        // const { email, password } = credentials
        await connectMongo().catch(error => { error: "Connection Failed..!" })
        const user = await Users.findOne({ email: credentials.email })
        // window.alert(user)
        if (!user) throw new Error("No User Found with Email Pleases Sign up..!")

        const passwordMatch = await compare(credentials.password, user.password)
        if (!passwordMatch) throw new Error("Username or Password doesn't match");

        return {
          // user
          name: user.username,
          email: user.email,
          role: user.role,
          id: user._id
        }
      }

    })
  ],


  callbacks: {
    session: ({session, token, user}) =>{
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }else{
        return false;
      }
    },
    // Getting the JWT token from API response
    async jwt(params) {
      if (params.user?.email) {
        params.token.email = params.user.email;
        params.token.id = params.user.id;
        params.token.role = params.user.role;

      }

      return params.token;
    },

    async session(session, token) {
      if (session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken
      }
      return session
    }
  }

}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log('admin', session?.token?.email)
  if (!adminEmails.includes(session?.token?.email)) {
  
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}


