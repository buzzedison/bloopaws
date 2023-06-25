

const Hero=() =>{
  return (
    <div className="container mx-auto">
<h1 className="text-5xl pt-24 pb-4 px-24  text-center">
Grow Your Business with <br/>
<span className=" mt-4 font-extrabold">Our <i className="text-red-600">Digital </i>and <i className="text-red-600">Consulting</i> Services</span>
</h1>
<p className="text-center text-gray-500">From Business Development to Web Development,<br/> Our Digital and Consulting Experts Help Drive Your Business Forward</p>
<div class="flex justify-center mt-6">
  <form class="max-w-screen-md">
    <div class="relative w-full">
      <input
        class="w-full px-5 pl-28 pr-28 rounded-2xl border-spacing-1 border-2 py-4"
        type="text"
      />
      <button
        class="absolute right-0 top-0 bottom-0 m-1 bg-red-600 hover:bg-black text-white px-6 py-4 rounded-lg"
      >
        Get Started
      </button>
    </div>
  </form>
</div>

    </div>
  )
}

export default Hero