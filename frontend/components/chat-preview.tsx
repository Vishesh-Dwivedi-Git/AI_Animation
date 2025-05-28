import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ChatPreview() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">interface()</h2>
          <p className="text-gray-400 text-lg">// clean chat-based animation creation</p>
        </div>

        <Card className="bg-gray-900 border-gray-800 overflow-hidden">
          <div className="flex h-[500px]">
            {/* Sidebar */}
            <div className="w-64 bg-black border-r border-gray-800 p-4">
              <div className="space-y-1">
                <div className="text-xs text-gray-500 mb-4">// navigation</div>
                <div className="p-3 bg-gray-800 rounded text-white text-sm">my_animations</div>
                <div className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded cursor-pointer text-sm transition-colors">
                  styles
                </div>
                <div className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded cursor-pointer text-sm transition-colors">
                  templates
                </div>
                <div className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded cursor-pointer text-sm transition-colors">
                  settings
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-white text-black p-4 rounded max-w-md font-mono text-sm">
                    create a sunset scene with a running fox
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-4 rounded max-w-md">
                    <p className="text-white mb-4 text-sm">generating animation...</p>

                    {/* Animation Preview */}
                    <div className="bg-gray-700 h-32 rounded mb-4 flex items-center justify-center">
                      <div className="text-gray-400 text-xs text-center">
                        <div className="w-8 h-8 bg-gray-600 rounded mx-auto mb-2" />
                        <p>animation_preview.mp4</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs font-mono"
                      >
                        regenerate
                      </Button>
                      <Button size="sm" className="bg-green-500 text-black text-xs font-mono">
                        download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-800">
                <div className="flex space-x-2">
                  <Input
                    placeholder="describe_your_animation()"
                    className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm"
                  />
                  <Button className="bg-green-500 text-black font-mono text-sm">send</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
