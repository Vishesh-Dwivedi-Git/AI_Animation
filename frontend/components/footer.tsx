export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="mb-4">
              <span className="text-lg font-bold text-white">[animagic.ai]</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-sm">
              ai-powered 2d animation generation from text descriptions. create stunning visuals in seconds.
            </p>
            <div className="text-xs text-gray-500">// social links</div>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                github
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                discord
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-4">// product</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  api_docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-4">// support</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  help_center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-xs">// made with ❤️ by the animagic team © 2024</p>
        </div>
      </div>
    </footer>
  )
}
