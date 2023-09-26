import NavBarNew from "./components/NavbarNew";
import AuthProviders from '../showcase/components/AuthProviders';

const Showcase =()=> {
    return (
        <>
        <NavBarNew/>
        <section className="flex-start flex-col paddings mb-16">
       <h1>Categories</h1>
            <h1>Posts</h1>
            <h1>Load more</h1>
            <AuthProviders/>
        </section>
        </>
    )
}

export default Showcase;