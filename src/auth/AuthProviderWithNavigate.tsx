import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type props = {
  children: React.ReactNode;
};
function AuthProviderWithNavigate({ children }: props) {
  const navigte = useNavigate();
  // const {getAccessTokenSilently}=useAuth0();
  const audience=import.meta.env.VITE_AUTH0_AUDIENCE;
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const client = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_AUTH0_CALL_BACK_URL;

  if (!domain || !client || !redirectUrl || !audience) {
    throw new Error("un able to init auth in authprovider navigate");
  }
  const onRedirectCallback = (appState?:AppState) => {
    // const accessToken=getAccessTokenSilently();
    // console.log("token",accessToken);

    navigte(appState?.returnTo || "/auth-callback");
  };
  return (
    <div>
      <Auth0Provider
        domain={domain}
        clientId={client}
        authorizationParams={{ redirect_uri: redirectUrl ,audience,}}
        onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>
    </div>
  );
}

export default AuthProviderWithNavigate;
