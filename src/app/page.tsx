import Header from "./components/Header";
import PostsPage from "./components/posts/PostsPage";

export default async function Home() {
  return (
    <div>
      <Header />
      <PostsPage />
    </div>
  );
}
