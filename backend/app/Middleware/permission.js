// import { decode } from "jsonwebtoken";
// import User from "../Models/User";

// async function decoder({request}) {

//   const authHeader = request.headers.authorization || "";

//   const [, token] = authHeader?.split(" ");

//   const payload = decode(token);

//   const user = await User.findOne(payload?.sub, {
//     relations: ["roles"],
//   });

//   return user;
// }

function is( role ) {
  // const roleAuthorized = async ( {request ,response ,next} ) => {
  //   const user = await decoder(request);

  //   const userRoles = user?.roles.map((role) => role.name);

  //   const existRoles = userRoles?.some((r) => role.includes(r));

  //   if ( existRoles ) {
  //     return next();
  //   }

  //   return response.status(401).json({ message: "Not authorized" });
  // };

  // return roleAuthorized;
}

// function  is(role: String[] ) {
//   const roleAuthorized = async ( request: Request , response: Response , next: NextFunction ) => {
//     const user = await decoder(request)

//     const userRoles = user?.roles.map(role => role.name)

//     const existRoles = userRoles?.some(r => role.includes(r))

//     console.log("user: " , user, " user Roles: " , userRoles, "existRoles: " ,existRoles)

//     if(existRoles) {
//       return next()
//     }

//     return response.status(401).json({message: "Not authorized"})
//   }

//   return roleAuthorized
// }

