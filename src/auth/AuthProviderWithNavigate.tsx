import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type props={
    children:React.ReactNode;
}
 function AuthProviderWithNavigate({children}:props) {
    const domain=import.meta.env.VITE_AUTH0_DOMAIN;
    const client=import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUrl=import.meta.env.VITE_AUTH0_CALL_BACK_URL;
    // console.log(import.meta.env);
    // console.log(domain);
    // console.log(client);
    // console.log(redirectUrl);
    
    if ( !domain || !client || !redirectUrl ) {
        throw new Error("un able to init auth")
    }
    const onRedirectCallback=(appState?: AppState, user?: User)=>{
        console.log(user);
        console.log(appState);
        
    }
  return (
    <div>
      <Auth0Provider domain={domain} clientId={client} authorizationParams={{ redirect_uri: redirectUrl }} onRedirectCallback={onRedirectCallback}>
        {children}
      </Auth0Provider>
    </div>
  )
}

export default AuthProviderWithNavigate

