import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <div className="text-center">
      <Image
        src="https://th.bing.com/th/id/R.dce620488f6403fc6fb752b38478f17b?rik=Y4liY3xKc2namA&riu=http%3a%2f%2finformatika.degasys.hu%2fwp-content%2fuploads%2f2023%2f06%2fInformatika.png&ehk=NLDMOQogHV5oaVZIYMfn8OrEQXjdKkF6LTgGU%2b2WMeQ%3d&risl=&pid=ImgRaw&r=0"
        alt="home"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg object-cover h-64"
        width={480}
        height={480}
      />
    </div>
  );
};

export default LandingPage;
