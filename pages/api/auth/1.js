import NextAuth, {getServerSession} from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from '@/lib/mongoose';
import { signJwtToken } from '@/lib/jwt';
// import connectDB from '@/lib/connectDB';
import Users from '@/models/User'
// connectDB()

// const adminEmails = ['dawid.paszko@gmail.com'];

// export const authOptions = {
  const handlers = NextAuth({

    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      // GoogleProvider({
        //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
     
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
     
        const {email, password } = credentials
        await mongooseConnect();
        const user = await Users.findOne({ email })
        if(!user) {
          throw new Error("Invalid input")
        }
        const comparePass = await GetBucketEncryptionOutputFilterSensitiveLog.compare(password, user.password)
        if(!comparePass){
          throw new Error("Invalid input")
        }else {
          const {password, ...currentUser} = user._doc
          const accessToken = signJwtToken(currentUser, {expiresIn: '3d'})

          return {
            ...currentUser,
            accessToken
          }
        }

        
      }
    })
  ],
  pages: {
    signIn: '/login'
  },

 
  callbacks: {
    async jwt({token, user}){
      if(user){
        token.accessToken = user.accessToken
        token._id = user._id 

      }
      return token
    },
    async session({session, token}){
      if(token){
        session.user._id = token._id
        session.user.accessToken = token.accessToken 
      }
    }
    
    //     session: ({session,token,user}) => {
//       if (adminEmails.includes(session?.user?.email)) {
//         return session;
//       } else {
//         return false;
//       }
//     },
//   },
// };

// export default NextAuth(authOptions);

// export async function isAdminRequest(req,res) {
//   const session = await getServerSession(req,res,authOptions);
//   if (!adminEmails.includes(session?.user?.email)) {
//     res.status(401);
//     res.end();
//     throw 'not an admin';
// }
}
})

// export {handlers as GET, handlers as POST}
export default NextAuth(handlers);
