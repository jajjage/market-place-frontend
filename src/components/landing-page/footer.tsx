import { FooterLinks, Logo, PaymentIcon, SocialIcon } from "./small-comp";

export function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mb-6 mt-4">
              The most trusted escrow service platform for secure online transactions between buyers
              and sellers worldwide.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon="twitter" label="Twitter" />
              <SocialIcon icon="facebook" label="Facebook" />
              <SocialIcon icon="instagram" label="Instagram" />
              <SocialIcon icon="linkedin" label="LinkedIn" />
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Company</h4>
            <FooterLinks links={["About Us", "Careers", "Press", "Blog"]} />
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Resources</h4>
            <FooterLinks links={["Help Center", "Security", "Pricing", "API Documentation"]} />
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Legal</h4>
            <FooterLinks
              links={["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR Compliance"]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p>© 2025 SecureEscrow. All rights reserved.</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <PaymentIcon type="visa" />
            <PaymentIcon type="mastercard" />
            <PaymentIcon type="paypal" />
            <PaymentIcon type="applePay" />
          </div>
        </div>
      </div>
    </footer>
  );
}
