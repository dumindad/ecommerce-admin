import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/conn';
import Users from '@/models/UserModels';
import { compare } from 'bcrypt';



export default NextAuth( {
    // export const authOptions = {
    session:{
        strategy: "jwt",
    },
    jwt:{
        secret: process.env.SECRET,
    },
    // pages: {
    //     signIn: "/SignIn"
    // },
    providers : [
       
        CredentialsProvider({
            id: "credentials",
            name: "Credential",
            credentials:{
                email:{
                    label: "Email",
                    type:"text"
                },
                password:{
                    label: "Password",
                    type:"password"
                }
            },
            async authorize(credentials, req){
                console.log("authorize")
                // const { email, password } = credentials
                await connectMongo().catch(error => {error: "Connection Failed..!"})
                const user = await Users.findOne({ email: credentials.email })
                // window.alert(user)
                if(!user)  throw new Error("No User Found with Email Pleases Sign up..!")

                const passwordMatch = await compare(credentials.password, user.password)
                if(!passwordMatch) throw new Error("Username or Password doesn't match");
            
                return{
                    // user
                    name: user.username,
                    email: user.email,
                    id: user._id
                }
            }

        })
    ],
    

    callbacks: {
        // Getting the JWT token from API response
        async jwt(params) {
          if (params.user?.email) {
            params.token.email = params.user.email;
            params.token.id = params.user.id;

          }
      
          return params.token;
        },
      
        async session(session, token) {
            if(session.user){
                session.user.id = token.id;
                session.accessToken = token.accessToken
            }
          return session
        }
      }
      
})

// const authHandler = NextAuth(authOptions);

// export { authHandler as GET, authHandler as POST};