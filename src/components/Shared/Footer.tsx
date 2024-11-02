"use client";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import {
  RiFileList2Line,
  RiShieldKeyholeLine,
  RiCodeLine,
} from "react-icons/ri";
import { useThemeContext } from "@/lib/provider";

const Footer = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <>
      <footer
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-white text-[#11181C]"
        }`}
      >
        <div className="pt-[70px] pb-[30px] font-Poppis">
          <div className="max-w-[1170px] mx-auto px-5 xl:px-0">
            <div className="flex lg:items-start justify-between flex-col lg:flex-row gap-y-[60px] mb-[30px]">
              <div className="max-w-[370px]">
                <a className="mb-[40px]" href="">
                  <Image
                    src={logo}
                    alt="Logo"
                    className={`h-10 ${
                      isDarkMode ? "brightness-125" : "text-yellow-600"
                    }`}
                    width={100}
                    height={40}
                  />
                </a>

                <p className="text-16px leading-28px mt-[30px]">
                  Transform your space with style and sustainability, one piece
                  at a time
                </p>
              </div>

              <div className="max-w-[723px]">
                <div className="flex gap-x-[60px] lg:gap-x-[110px] justify-between flex-wrap">
                  <div>
                    <h5 className="text-20px leading-30px font-bold mb-[24px]">
                      Company
                    </h5>

                    <ul>
                      <li className="mb-[18px]">
                        <a className="text-[16px] leading-26px" href="">
                          Careers
                        </a>
                      </li>
                      <li className="mb-[18px]">
                        <a className="text-[16px] leading-26px" href="">
                          Press
                        </a>
                      </li>
                      <li className="mb-[18px]">
                        <a className="text-[16px] leading-26px" href="">
                          About us
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-20px leading-30px font-bold mb-[24px]">
                      About Us
                    </h5>

                    <ul>
                      <li className="mb-[18px]">
                        <a className="text-[16px] leading-26px" href="">
                          Blog
                        </a>
                      </li>

                      <li className="mb-[18px]">
                        <a className="text-[16px] leading-26px" href="">
                          Community
                        </a>
                      </li>
                      <li className="mb-[18px]">
                        <a className="text-[16px] leading-26px" href="">
                          FAQ
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-20px leading-30px font-bold mb-[24px]">
                      Contact Us
                    </h5>

                    <ul>
                      <li className="mb-[18px] flex items-center gap-2">
                        <FaLinkedin />
                        <a className="text-[16px] leading-26px" href="">
                          LinkedIn
                        </a>
                      </li>
                      <li className="mb-[18px] flex items-center gap-2">
                        <FaFacebook />
                        <a className="text-[16px] leading-26px" href="">
                          Facebook
                        </a>
                      </li>
                      <li className="mb-[18px] flex items-center gap-2">
                        <FaInstagram />
                        <a className="text-[16px] leading-26px" href="">
                          Instagram
                        </a>
                      </li>
                      <li className="mb-[18px] flex items-center gap-2">
                        <FaTwitter />
                        <a className="text-[16px] leading-26px" href="">
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`max-w-[1170px] mx-auto h-[1px] mb-[30px] ${
                isDarkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            ></div>

            <div className="flex justify-between flex-col md:flex-row gap-y-[30px]">
              <div className="flex gap-x-[15px] sm:gap-x-[30px]">
                <a
                  className="flex items-center gap-2 text-[14px] leading-24px"
                  href=""
                >
                  <RiFileList2Line /> Terms of Service
                </a>
                <a
                  className="flex items-center gap-2 text-[14px] leading-24px"
                  href=""
                >
                  <RiShieldKeyholeLine /> Privacy Policy
                </a>
                <a
                  className="flex items-center gap-2 text-[14px] leading-24px"
                  href=""
                >
                  <RiCodeLine /> Cookie Policy
                </a>
              </div>
              <p className="text-[14px] leading-24px">
                Copyright © 2024 Company All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
