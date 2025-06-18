import { useState, useEffect, useRef } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (message) {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 2700); // Start fade-out before removal
      const removeTimer = setTimeout(() => setMessage(''), 3000);
      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [message]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please include a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setMessage('Thank you for signing up!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-between font-noto">
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/20 to-transparent pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full flex flex-col justify-start items-center px-4 sm:px-6 pt-20 relative z-10">
        <div className="text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-normal text-white drop-shadow-md">
            Skye
          </h1>
          
          <p className="mt-4 text-base text-s sm:text-lg md:text-xl text-gray-300 max-w-2xl">
            Your AI broker for buying and selling businesses effortlessly.
          </p>
          <form onSubmit={handleSignup} noValidate className="mt-12 mb-12 flex flex-col items-center w-full">
            <div className="w-full max-w-xl px-4">
              <div
                className="flex w-full rounded-full bg-white/10 border border-white/20 focus-within:border-white/40 transition-all cursor-text"
                onClick={() => inputRef.current && inputRef.current.focus()}
                tabIndex={0}
                role="button"
                aria-label="Enter your email to join the waitlist"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 py-4 text-[10px] md:text-[14px] px-6 bg-transparent text-white rounded-full text-lg font-normal focus:outline-none placeholder:text-white/60 disabled:opacity-50"
                  ref={inputRef}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="h-full px-6 py-4 text-[9px] md:text-[12px] bg-white text-black rounded-full font-semibold shadow-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed m-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join the waitlist'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Images Section */}
      <div className="w-full flex items-end justify-center relative z-10 pb-2">
      {/* Vector SVG: 12% of viewport height */}
      <svg width="118" height="360" viewBox="0 0 118 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[25vh] md:h-[35vh] w-auto z-15 -translate-y-[10px]">
        <g filter="url(#filter0_dddddd_9_69)">
        <path d="M55.5741 7.08892C54.0819 7.24119 52.4763 7.60282 52.1741 7.83123C52.0797 7.92639 51.7586 8.04062 51.4752 8.11675C49.7186 8.53549 46.7341 11.1431 45.6763 13.1796C44.9963 14.512 44.883 14.8165 44.3164 16.9863C43.9764 18.3187 43.4852 23.5149 43.6552 24.0668C43.7119 24.2001 43.7875 25.3231 43.863 26.5602L43.9764 28.8062L43.3908 29.3772C42.4464 30.3479 42.2575 30.8809 42.2575 32.7271C42.2575 34.3069 42.6352 36.7812 42.9941 37.5045C43.7875 39.1414 44.1086 39.6934 44.6564 40.3215C46.6775 42.6626 47.5841 44.8895 47.9052 48.3155C48.2263 51.9319 47.8108 54.3873 46.5075 56.481C44.9775 58.9172 43.1075 60.0783 34.0408 64.2847C26.353 67.863 22.4052 70.3944 18.8352 74.0489C16.9652 75.9713 15.643 77.8175 14.5852 79.9683C13.5652 82.043 12.6019 84.898 12.6019 85.8687C12.6019 86.1352 12.5075 86.6681 12.413 87.0298C12.0164 88.3811 11.3741 93.5392 10.9964 98.2596C10.8452 100.087 10.6375 102.238 10.543 103.018C10.4297 103.798 10.3541 105.188 10.3352 106.082C10.3352 106.996 10.2408 108.176 10.1464 108.747C10.033 109.318 9.86302 110.841 9.76857 112.154C9.65524 113.467 9.44746 115.904 9.29635 117.579C9.14524 119.254 8.89968 122.128 8.74857 123.955C8.59746 125.782 8.42746 127.419 8.3708 127.571C8.29524 127.742 8.16302 129.227 8.06857 130.902C7.97413 132.577 7.80413 134.937 7.6908 136.136C7.57746 137.335 7.38857 139.524 7.25635 140.99C6.76524 146.719 7.0108 165.124 7.72857 176.107C7.84191 177.839 7.99302 183.358 8.04968 188.383C8.12524 195.159 8.21968 197.634 8.40857 197.938C8.52191 198.167 8.63524 198.528 8.63524 198.738C8.63524 198.966 8.82413 199.67 9.0508 200.317C10.2786 203.915 13.2064 207.702 16.3986 209.834C18.2497 211.071 18.8541 211.319 20.0064 211.376C20.913 211.414 21.0075 211.376 21.0641 210.976C21.1019 210.691 20.8941 210.291 20.3464 209.72C19.9119 209.263 19.4019 208.635 19.2319 208.35C19.043 208.045 18.7597 207.683 18.5897 207.531C18.4008 207.398 18.2686 207.207 18.2686 207.112C18.2686 207.036 18.023 206.598 17.7208 206.142C16.1341 203.762 15.5108 201.307 15.8508 198.909C16.0775 197.386 16.2475 197.044 16.7764 197.044C17.0408 197.044 17.1352 197.177 17.1352 197.519C17.1352 197.767 17.2486 198.357 17.3997 198.795C17.5319 199.251 17.7964 200.089 17.9664 200.66C18.363 201.935 19.3075 203.839 19.8364 204.429C20.3275 204.962 20.8375 204.962 21.1208 204.429C21.3663 203.991 21.3097 202.639 20.7997 196.853C20.2519 190.458 20.063 189.278 18.9108 185.642C18.2497 183.625 18.3064 182.045 19.3264 172.871C19.4964 171.348 19.7419 169.045 19.8741 167.732C20.3841 162.859 21.5552 153.876 21.8575 152.543C21.9708 152.105 22.0464 151.458 22.0464 151.116C22.0464 150.792 22.2163 149.707 22.4241 148.717C22.6319 147.728 22.8019 146.529 22.8019 146.053C22.8019 145.577 22.8775 144.873 22.9908 144.511C23.0852 144.149 23.2552 143.236 23.3497 142.513C23.4441 141.77 23.6708 140.324 23.8219 139.277C23.9919 138.23 24.2186 136.688 24.313 135.851C24.4264 135.013 24.5964 134.062 24.6908 133.757C24.7852 133.434 24.9175 132.501 24.9741 131.663C25.0497 130.826 25.1819 129.874 25.2764 129.57C25.3708 129.246 25.5219 128.352 25.6164 127.571C25.8052 126.029 26.6552 120.453 26.9386 118.911C27.033 118.378 27.1652 117.407 27.2408 116.722C27.543 113.467 28.1852 115.218 28.6575 120.624C28.7708 121.88 28.9408 124.526 29.0352 126.524C29.1297 128.504 29.2997 131.169 29.3941 132.425C29.6586 135.375 29.6586 148.185 29.413 150.145C29.2997 150.963 29.1297 153.324 29.0352 155.36C28.9219 157.397 28.7141 160.48 28.563 162.212C28.4119 163.944 28.2041 166.552 28.1097 168.017C27.9963 169.483 27.8264 171.443 27.713 172.395C27.6186 173.328 27.4486 175.46 27.3352 177.115C27.2408 178.771 27.1086 180.218 27.0519 180.294C26.9952 180.389 26.863 183.606 26.7686 187.47C26.5608 194.798 26.7497 206.865 27.1275 211.319C27.2408 212.632 27.4297 215.202 27.5241 217.029C27.6375 218.856 27.8452 221.939 27.9775 223.881C28.4308 229.762 28.4497 230.105 28.7519 234.635C28.903 237.033 29.1297 240.212 29.243 241.677C29.3375 243.143 29.5075 245.96 29.6019 247.958C29.6963 249.938 29.8664 252.774 29.9797 254.239C30.093 255.705 30.263 259.949 30.3763 263.661C30.8297 279.649 31.2641 290.079 31.6608 294.019C31.7741 295.066 31.9441 297.255 32.0575 298.873C32.3786 303.384 32.6052 306.239 32.7941 308.009C32.9075 308.904 33.1152 310.959 33.2852 312.577C33.4552 314.195 33.6819 316.213 33.7952 317.05C34.0219 318.763 34.0219 318.839 34.4186 323.331C34.5697 325.101 34.7964 327.595 34.9097 328.851C35.6275 336.616 35.3252 338.843 33.0775 341.984C32.6241 342.612 32.0008 343.43 31.6797 343.792C30.3952 345.239 30.0175 346.799 30.6786 347.789C31.2641 348.665 32.7186 349.902 33.8519 350.473C35.3063 351.234 38.7064 352.357 39.4808 352.357C39.8208 352.357 40.8975 352.452 41.8986 352.586C44.7886 352.947 47.7352 352.395 48.9064 351.31C49.8319 350.454 49.9641 349.616 50.0775 344.458C50.3041 333.229 50.5875 323.065 50.7575 319.524C50.8708 317.431 51.0408 312.501 51.1352 308.58C51.2297 304.659 51.3997 299.178 51.4941 296.399C51.6075 293.62 51.7775 287.891 51.8908 283.646C52.533 258.579 53.5719 238.194 54.743 226.926C54.8375 225.936 55.0075 224.223 55.1019 223.12C55.4608 218.951 55.6686 216.667 55.9519 214.364C56.103 213.051 56.273 211.547 56.3108 211.033C56.4052 209.739 56.8775 205.456 57.3686 201.421C57.4819 200.527 57.6519 198.947 57.7652 197.9C57.8786 196.853 58.0108 195.883 58.0486 195.73C58.2375 195.159 58.6341 195.978 58.8419 197.329C59.6163 202.259 59.9752 204.866 60.2208 207.322C60.3152 208.311 60.4663 209.549 60.5608 210.082C60.6741 210.595 60.7875 211.623 60.863 212.366C60.9197 213.089 61.0519 214.25 61.1463 214.935C61.2408 215.62 61.4486 217.581 61.6186 219.313C61.7697 221.045 62.0341 223.691 62.1852 225.213C62.3363 226.736 62.5441 229.477 62.6575 231.304C62.7708 233.131 62.9408 235.739 63.0352 237.109C63.1297 238.461 63.2997 241.087 63.413 242.914C63.5263 244.742 63.6963 247.444 63.8097 248.91C63.9041 250.376 64.0552 254.392 64.1686 257.856C64.2819 261.301 64.4519 265.412 64.5463 266.954C64.6597 268.514 64.7352 270.913 64.7352 272.283C64.7352 273.673 64.8675 277.022 65.0186 279.744C65.1697 282.466 65.3019 286.063 65.3019 287.738C65.3019 289.413 65.3963 292.287 65.4908 294.115C65.7741 299.216 66.2275 311.473 66.4352 319.524C66.5297 323.502 66.6619 327.442 66.7186 328.28C66.7941 329.117 66.9075 334.256 66.983 339.7C67.1152 348.893 67.153 349.654 67.493 350.34C68.0786 351.558 69.0041 352.167 70.723 352.471C76.4086 353.48 84.4741 351.12 86.4575 347.865C87.0241 346.952 86.9108 345.581 86.193 344.706C83.4164 341.261 82.7741 340.176 82.1886 338.082C81.773 336.616 81.7352 333.552 82.0752 330.469C82.2075 329.365 82.3964 327.576 82.4908 326.472C82.8119 323.236 83.3975 317.926 83.6241 316.289C83.7375 315.451 83.9075 313.948 84.0019 312.958C84.0775 311.968 84.2475 310.502 84.3608 309.722C84.5497 308.409 84.6441 307.419 85.1541 301.347C85.5697 296.342 85.9097 291.697 86.0797 288.119C86.1741 286.025 86.3441 283.418 86.4575 282.314C86.5519 281.21 86.7219 276.889 86.8352 272.702C86.9297 268.514 87.0619 264.536 87.1186 263.851C87.1752 263.166 87.3075 259.702 87.4019 256.143C87.6286 247.958 87.9119 241.982 88.1575 239.774C88.2708 238.822 88.4408 236.386 88.5541 234.349C88.6675 232.313 88.8186 229.914 88.913 229.02C89.0075 228.125 89.083 226.317 89.083 225.004C89.1019 223.691 89.1964 222.149 89.2908 221.578C89.4041 221.007 89.5552 218.913 89.6686 216.934C90.2541 205.209 90.4619 199.347 90.4619 195.806C90.4619 191.086 90.1219 181.607 89.8575 178.771C89.6875 176.811 89.4419 173.556 89.1019 168.493C89.0075 167.085 88.8563 165.143 88.743 164.211C88.6297 163.259 88.4597 161.337 88.3464 159.928C88.1008 156.293 87.7986 152.734 87.5908 150.411C87.3452 147.823 87.3452 132.253 87.5908 129.665C87.6852 128.561 87.8552 126.467 87.9686 125.002C88.3463 120.091 88.6864 116.817 88.913 116.189C89.1397 115.599 89.3664 115.428 89.5552 115.732C89.7441 116.037 90.4997 120.776 90.8208 123.669C90.9152 124.602 91.0852 125.63 91.1797 125.953C91.2741 126.258 91.4063 126.943 91.463 127.476C91.5386 127.99 91.6519 128.846 91.7463 129.379C91.9541 130.578 92.3886 133.205 92.7664 135.66C92.9175 136.707 93.1441 138.116 93.2575 138.801C93.3519 139.486 93.5408 140.628 93.6541 141.371C93.7486 142.094 93.9186 143.122 94.013 143.655C94.183 144.587 94.4286 146.167 95.0519 150.602C95.2219 151.801 95.4864 153.476 95.6375 154.313C95.7886 155.151 95.9963 156.521 96.0908 157.359C96.1852 158.196 96.5252 161.013 96.8464 163.64C97.1675 166.247 97.5075 169.464 97.6019 170.777C97.6964 172.091 97.8664 173.575 97.9797 174.108C98.1497 174.946 98.3575 177.287 98.6786 182.312C98.773 183.872 98.5841 184.919 97.8664 186.518C97.7152 186.842 97.6019 187.26 97.6019 187.432C97.6019 187.603 97.5075 187.907 97.3941 188.117C97.0541 188.764 96.6008 192.266 96.0908 198.09C95.883 200.298 95.8452 204.105 96.0152 204.543C96.223 205.057 96.9786 204.904 97.4697 204.219C98.263 203.172 99.2452 200.679 99.8686 198.243C99.9819 197.786 100.227 197.348 100.435 197.234C100.756 197.063 100.851 197.101 101.021 197.557C101.512 198.852 101.587 199.975 101.285 201.535C101.134 202.411 100.87 203.344 100.719 203.648C100.567 203.934 100.435 204.333 100.435 204.505C100.435 204.676 100.36 204.866 100.265 204.923C100.171 204.981 99.9063 205.399 99.6797 205.837C99.2452 206.675 98.8108 207.265 97.0919 209.434C96.5441 210.12 96.0908 210.843 96.0908 210.995C96.0908 211.737 97.923 211.528 99.3208 210.634C99.7175 210.386 100.095 210.177 100.152 210.177C100.416 210.177 102.343 208.692 103.344 207.721C104.912 206.199 106.083 204.581 107.027 202.639C108.104 200.432 108.123 200.413 108.576 198.852C108.935 197.653 108.992 196.777 109.143 190.287C109.237 186.309 109.389 181.645 109.483 179.913C109.596 178.181 109.766 174.375 109.861 171.443C109.974 168.512 110.163 165.048 110.257 163.735C110.541 159.985 110.635 152.334 110.446 148.794C110.069 141.961 109.691 136.498 109.426 133.567C108.992 128.999 108.709 126.543 108.633 126.41C108.595 126.334 108.482 125.059 108.369 123.555C108.255 122.071 108.085 120.529 107.991 120.167C107.877 119.786 107.707 118.416 107.613 117.103C107.424 114.628 107.084 110.936 106.574 105.873C106.423 104.255 106.196 101.857 106.083 100.544C105.989 99.2303 105.856 98.0311 105.781 97.8789C105.724 97.7266 105.554 96.2991 105.422 94.7383C104.987 89.7135 104.515 86.7443 103.741 83.9844C103.571 83.4134 103.363 82.614 103.25 82.2143C103.155 81.8146 103.004 81.3578 102.91 81.1674C102.815 80.9961 102.456 80.2919 102.135 79.6067C101.795 78.9215 101.399 78.2363 101.266 78.065C101.115 77.9127 101.002 77.7033 101.002 77.6462C101.002 77.2846 99.453 75.3241 97.9041 73.7444C94.9952 70.7371 92.1052 68.7195 87.3264 66.3593C85.9475 65.6932 84.7764 65.1412 84.7197 65.1412C84.6441 65.1412 84.0397 64.8747 83.3786 64.5702C82.6986 64.2466 82.0941 63.9992 82.0186 63.9992C81.9619 63.9992 81.3386 63.7327 80.6397 63.4091C72.083 59.4311 69.9675 57.661 68.9852 53.664C68.4941 51.6845 68.7963 45.708 69.4197 44.9086C69.5141 44.7753 69.6463 44.4517 69.7219 44.1472C69.8352 43.6714 70.8741 41.768 71.1575 41.5396C71.4975 41.2541 73.0275 39.0653 73.2919 38.4943C74.1419 36.6099 74.2363 36.2293 74.3119 34.2688C74.463 31.3757 74.3308 30.7286 73.3863 29.7198L72.6119 28.8823L72.763 27.0741C72.8575 26.0844 72.933 24.714 72.933 24.0288C72.9519 22.468 72.4797 17.5193 72.2908 17.2719C72.2152 17.1577 72.1019 16.777 72.0263 16.4154C71.8375 15.3876 70.7986 12.9893 70.1375 12.0567C68.4563 9.63943 65.8875 8.07868 62.3741 7.31734C61.0897 7.03184 57.1986 6.89858 55.5741 7.08892Z" fill="black"/>
        </g>
        <defs>
        <filter id="filter0_dddddd_9_69" x="0.0577707" y="0.0577707" width="117.429" height="359.591" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="0.0826456"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9_69"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="0.165291"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow_9_69" result="effect2_dropShadow_9_69"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="0.578519"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect2_dropShadow_9_69" result="effect3_dropShadow_9_69"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="1.15704"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect3_dropShadow_9_69" result="effect4_dropShadow_9_69"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="1.98349"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect4_dropShadow_9_69" result="effect5_dropShadow_9_69"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="3.47111"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect5_dropShadow_9_69" result="effect6_dropShadow_9_69"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_9_69" result="shape"/>
        </filter>
        </defs>
      </svg>


      {/* rectangle svg */}
      <svg width="460" height="713" viewBox="0 0 460 713" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[50vh] md:h-[65vh] w-auto z-10 -translate-y-[-1px] animate-pulse-glow">
      <g filter="url(#filter0_dddddd_9_61)">
      <path d="M102.97 640C86.4179 640 73 625.038 73 606.582V106.418C73 87.9619 86.4179 73 102.97 73H357.03C373.582 73 387 87.9619 387 106.418V606.582C387 625.038 373.582 640 357.03 640H102.97Z" fill="url(#paint0_linear_9_61)" fill-opacity="0.4"/>
      </g>
      <defs>
      <filter id="filter0_dddddd_9_61" x="-0.00479126" y="-0.00479126" width="460.01" height="713.01" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="0.869105">
        <animate attributeName="stdDeviation" values="0.869105;1.1;0.869105" dur="4s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9_61"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="1.73821">
        <animate attributeName="stdDeviation" values="1.73821;2.2;1.73821" dur="4s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_dropShadow_9_61" result="effect2_dropShadow_9_61"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="6.08373">
        <animate attributeName="stdDeviation" values="6.08373;7.5;6.08373" dur="4s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect2_dropShadow_9_61" result="effect3_dropShadow_9_61"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="12.1675">
        <animate attributeName="stdDeviation" values="12.1675;14;12.1675" dur="4s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect3_dropShadow_9_61" result="effect4_dropShadow_9_61"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="20.8585">
        <animate attributeName="stdDeviation" values="20.8585;23;20.8585" dur="4s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect4_dropShadow_9_61" result="effect5_dropShadow_9_61"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="36.5024">
        <animate attributeName="stdDeviation" values="36.5024;39;36.5024" dur="4s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect5_dropShadow_9_61" result="effect6_dropShadow_9_61"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_9_61" result="shape"/>
      </filter>
      <linearGradient id="paint0_linear_9_61" x1="238.853" y1="82.5562" x2="271.493" y2="757.55" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0037FF" stop-opacity="0.4"/>
      <stop offset="0.588856" stop-color="#322681" stop-opacity="0.223177"/>
      <stop offset="0.733779" stop-color="#1F2F57" stop-opacity="0.17966"/>
      <stop offset="0.866007" stop-color="#495474" stop-opacity="0.139954"/>
      <stop offset="1" stop-opacity="0.1"/>
      </linearGradient>
      </defs>
      </svg>

      {/* Shadow SVG: 35% of viewport height */}
      <svg width="596" height="424" viewBox="0 0 596 424" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[30vh] md:h-[35vh] w-auto z-10 -translate-y-[-55px]">
        <g filter="url(#filter0_dddddd_30_6)">
        <path d="M313.5 250L281.89 718.75H345.11L313.5 250Z" fill="#D9D9D9" fill-opacity="0.02"/>
        </g>
        <g filter="url(#filter1_dddddd_30_6)">
        <path d="M282.5 250L250.89 718.75H314.11L282.5 250Z" fill="#D9D9D9" fill-opacity="0.02"/>
        </g>
        <defs>
        <filter id="filter0_dddddd_30_6" x="31.8901" y="0" width="563.22" height="968.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="18.8597"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="37.7194"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow_30_6" result="effect2_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect2_dropShadow_30_6" result="effect3_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect3_dropShadow_30_6" result="effect4_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect4_dropShadow_30_6" result="effect5_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect5_dropShadow_30_6" result="effect6_dropShadow_30_6"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_30_6" result="shape"/>
        </filter>
        <filter id="filter1_dddddd_30_6" x="0.890076" y="0" width="563.22" height="968.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="18.8597"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="37.7194"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow_30_6" result="effect2_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect2_dropShadow_30_6" result="effect3_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect3_dropShadow_30_6" result="effect4_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect4_dropShadow_30_6" result="effect5_dropShadow_30_6"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="125"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect5_dropShadow_30_6" result="effect6_dropShadow_30_6"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_30_6" result="shape"/>
        </filter>
        </defs>
        </svg>

    </div>


      {/* Notification Modal */}
      {message && (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${showModal ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'} animate-fade-in`}>
          <div className={`px-4 py-2 rounded-lg shadow-lg ${
            message.includes('Thank you') 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}