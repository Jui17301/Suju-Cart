import Image from "next/image";

const Team = () => {
  return (
    <div>
      <div className="">
        <div className="container mx-auto px-6 md:px-12 xl:px-32">
          <div className="grid gap-12 items-center md:grid-cols-3">
            <div className="space-y-4 text-center">
              <Image
                alt="woman"
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                height="805"
                loading="lazy"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="640"
              />
              <div>
                <h4 className="text-2xl text-grayText">Selena Gomez</h4>
                <span className="block text-sm text-grayText/70">
                  CEO-Founder
                </span>
              </div>
            </div>
            <div className="space-y-4 text-center">
              <Image
                alt="man"
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80"
                height="667"
                loading="lazy"
                src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                width="1000"
              />

              <div>
                <h4 className="text-2xl text-grayText">Jack Abraham</h4>
                <span className="block text-sm text-grayText/70">
                  Chief Technical Officer
                </span>
              </div>
            </div>
            <div className="space-y-4 text-center">
              <Image
                alt="woman"
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                height="667"
                loading="lazy"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="1000"
              />

              <div>
                <h4 className="text-2xl text-grayText">Sarah Taylor</h4>
                <span className="block text-sm text-grayText/70">
                  Chief Operations Officer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
