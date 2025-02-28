"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Star, Twitter } from "lucide-react"

export default function GitHubCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="p-1 ">
      <Card
        className={`w-full max-w-[350px] overflow-hidden transition-all duration-300 ${
          isHovered ? "shadow-lg transform -translate-y-1" : "shadow"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Quick DevUtils</CardTitle>
            <Star
              className={`w-5 h-5 transition-all duration-500 ${isHovered ? "rotate-[360deg] text-yellow-300" : "text-white"}`}
            />
          </div>
          <CardDescription className="text-blue-100">Developer utilities to boost your productivity</CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-muted-foreground mb-2">
            A collection of essential developer tools designed to streamline your workflow and enhance productivity.
          </p>

          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Star on GitHub</h3>
                <p className="text-sm text-muted-foreground">Support the project with a star</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Twitter className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Follow on X</h3>
                <p className="text-sm text-muted-foreground">Stay updated with latest features</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 p-2">
          <Button asChild className="w-full sm:w-auto group relative overflow-hidden">
            <Link href="https://github.com/Mudasir-Fayaz/Quick_DevUtils_Tools" target="_blank" rel="noopener noreferrer">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transform group-hover:translate-y-0 -translate-y-full transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Github className="w-4 h-4" />
                <span>Star on GitHub</span>
              </span>
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full sm:w-auto group">
            <Link href="https://x.com/@mudasirbuilds" target="_blank" rel="noopener noreferrer">
              <span className="flex items-center justify-center gap-2 group-hover:text-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
                <span>Follow on X</span>
              </span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

