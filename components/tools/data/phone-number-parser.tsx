// 'use client'

// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { parsePhoneNumber, CountryCode } from 'libphonenumber-js'
// import { Check, Copy, AlertCircle } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// export default function PhoneNumberParser() {
//   const [input, setInput] = useState('')
//   const [parsedNumber, setParsedNumber] = useState<any>(null)
//   const [format, setFormat] = useState('E164')
//   const [error, setError] = useState('')
//   const [copied, setCopied] = useState(false)

//   useEffect(() => {
//     try {
//       const number = parsePhoneNumber(input, 'US' as CountryCode)
//       if (number) {
//         setParsedNumber(number)
//         setError('')
//       } else {
//         throw new Error('Invalid phone number')
//       }
//     } catch (err) {
//       setParsedNumber(null)
//       setError('Invalid phone number')
//     }
//   }, [input])

//   const getFormattedNumber = () => {
//     if (!parsedNumber) return ''
//     switch (format) {
//       case 'E164':
//         return parsedNumber.format('E.164')
//       case 'INTERNATIONAL':
//         return parsedNumber.format('INTERNATIONAL')
//       case 'NATIONAL':
//         return parsedNumber.format('NATIONAL')
//       default:
//         return parsedNumber.format('E.164')
//     }
//   }

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(getFormattedNumber())
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
//     >
//       <h2 className="text-2xl font-bold mb-4">Phone Number Parser</h2>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="phone-input">Enter Phone Number</Label>
//           <Input
//             id="phone-input"
//             type="tel"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="(123) 456-7890"
//             className="w-full"
//           />
//         </div>

//         <RadioGroup value={format} onValueChange={setFormat} className="flex space-x-4">
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="E164" id="e164" />
//             <Label htmlFor="e164">E.164</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="INTERNATIONAL" id="international" />
//             <Label htmlFor="international">International</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="NATIONAL" id="national" />
//             <Label htmlFor="national">National</Label>
//           </div>
//         </RadioGroup>

//         {parsedNumber && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="bg-gray-100 p-4 rounded-md"
//           >
//             <p className="font-semibold">Formatted Number:</p>
//             <p className="text-lg">{getFormattedNumber()}</p>
//             <p>Country: {parsedNumber.country}</p>
//             <Button onClick={copyToClipboard} className="mt-2">
//               {copied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
//               {copied ? 'Copied!' : 'Copy'}
//             </Button>
//           </motion.div>
//         )}

//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="text-red-500 flex items-center"
//           >
//             <AlertCircle className="mr-2" />
//             {error}
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   )
// }

import React from 'react'

const PhoneNumberParser = () => {
  return (
    <div>
      phone
    </div>
  )
}

export default PhoneNumberParser
