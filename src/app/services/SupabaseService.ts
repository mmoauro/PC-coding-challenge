import {
  AuthError,
  createClient,
  OAuthResponse,
  SupabaseClient,
  Session as SupabaseSession,
} from "@supabase/supabase-js";

class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_PROJECT_URL,
      process.env.SUPABASE_API_KEY
    );
  }

  getSession(): Promise<
    | {
        data: {
          session: SupabaseSession;
        };
        error: null;
      }
    | {
        data: {
          session: null;
        };
        error: AuthError;
      }
    | {
        data: {
          session: null;
        };
        error: null;
      }
  > {
    return this.supabase.auth.getSession();
  }

  signIn(): Promise<OAuthResponse> {
    return this.supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  signOut(): Promise<{ error: AuthError | null }> {
    return this.supabase.auth.signOut();
  }
}

export default new SupabaseService();
