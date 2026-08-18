/**
 * Official Facebook OAuth Service using Meta SDK & Graph API
 */

declare global {
  interface Window {
    fbAsyncInit?: () => void
    FB?: any
  }
}

export interface FacebookUserProfile {
  id: string
  name: string
  email: string
  picture?: {
    data?: {
      url?: string
    }
  }
}

export const initFacebookSdk = (appId?: string): Promise<void> => {
  return new Promise((resolve) => {
    const activeAppId = appId || import.meta.env.VITE_FACEBOOK_APP_ID || "123456789012345"

    if (window.FB) {
      window.FB.init({
        appId: activeAppId,
        cookie: true,
        xfbml: true,
        version: "v18.0"
      })
      resolve()
      return
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: activeAppId,
        cookie: true,
        xfbml: true,
        version: "v18.0"
      })
      resolve()
    }

    // Load official SDK if not already loaded
    if (!document.getElementById("facebook-jssdk")) {
      const js = document.createElement("script")
      js.id = "facebook-jssdk"
      js.src = "https://connect.facebook.net/id_ID/sdk.js"
      js.async = true
      js.defer = true
      document.body.appendChild(js)
    }
  })
}

export const loginWithOfficialFacebook = async (): Promise<{ name: string; email: string; avatar?: string; id: string }> => {
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID

  // If no official App ID is provided yet, inform the user clearly
  if (!appId || appId === "MASUKKAN_FACEBOOK_APP_ID_DISINI") {
    throw new Error("FACEBOOK_APP_ID_MISSING")
  }

  await initFacebookSdk(appId)

  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error("Facebook SDK failed to initialize"))
      return
    }

    window.FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken
        // Fetch real profile from Graph API
        window.FB.api("/me", { fields: "id,name,email,picture.width(200).height(200)", access_token: accessToken }, (profile: FacebookUserProfile) => {
          if (profile && profile.name) {
            resolve({
              id: profile.id,
              name: profile.name,
              email: profile.email || `facebook_${profile.id}@facebook.com`,
              avatar: profile.picture?.data?.url
            })
          } else {
            reject(new Error("Failed to fetch Facebook profile"))
          }
        })
      } else {
        reject(new Error("User cancelled login or did not fully authorize."))
      }
    }, { scope: "public_profile,email" })
  })
}
