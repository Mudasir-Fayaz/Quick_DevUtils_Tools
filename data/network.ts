import { 
  Ipv4SubnetCalculator,
  Ipv4AddressConverter,
  Ipv4RangeExpander,
  MacAddressLookup,
  MacAddressGenerator,
  Ipv6UlaGenerator
} from "@/components/tools/network";

import { ToolCategory } from "@/types";

const networkTools: ToolCategory = {
  name: "Network Tools",
  icon: "Network",
  tools: [
    {
      name: "IPv4 Subnet Calculator",
      icon: 'Calculator',
      description: "The IPv4 Subnet Calculator helps in calculating subnet masks, network addresses, and host ranges. This tool is essential for network administrators and IT professionals who need to manage IPv4 subnets and ensure proper network configuration.",
      faqs: [
        { question: "What does the IPv4 Subnet Calculator do?", answer: "It calculates subnet masks, network addresses, and host ranges for IPv4 networks." },
        { question: "Can I calculate subnet information for different network classes?", answer: "Yes, you can calculate subnet information for Class A, B, and C networks." },
        { question: "Is this tool free?", answer: "Yes, the IPv4 Subnet Calculator is free to use." },
        { question: "How do I use the IPv4 Subnet Calculator?", answer: "Simply enter the IP address and subnet mask, and the tool will calculate the required network details." },
        { question: "Can I use it for CIDR (Classless Inter-Domain Routing)?", answer: "Yes, the tool supports CIDR notation for subnetting." }
      ],
      keywords: "ipv4, subnet, network, cidr, calculator",
      slug: "/tool/ipv4-subnet",
      component: Ipv4SubnetCalculator
    },
    {
      name: "IPv4 Address Converter",
      icon: 'ArrowLeftRight',
      description: "The IPv4 Address Converter allows you to convert IPv4 addresses between decimal, binary, and hexadecimal formats. This tool is ideal for network engineers and those working with IPv4 address configurations.",
      faqs: [
        { question: "What formats can I convert IPv4 addresses to?", answer: "You can convert IPv4 addresses between decimal, binary, and hexadecimal formats." },
        { question: "Is this tool free?", answer: "Yes, the IPv4 Address Converter is free to use." },
        { question: "How do I convert an IPv4 address?", answer: "Enter the IPv4 address in one format and select the format to which you want to convert it." },
        { question: "Can I convert from binary to decimal?", answer: "Yes, you can convert an IPv4 address from binary to decimal and vice versa." },
        { question: "What is the advantage of using this tool?", answer: "It helps in visualizing IPv4 addresses in different formats for better understanding and network troubleshooting." }
      ],
      keywords: "ipv4, conversion, decimal, binary, hexadecimal",
      slug: "/tool/ipv4-converter",
      component: Ipv4AddressConverter
    },
    {
      name: "IPv4 Range Expander",
      icon: 'Expand',
      description: "The IPv4 Range Expander generates IP lists from a given range of IPv4 addresses. This tool is useful for network administrators when they need to quickly expand a range of IPs for subnetting, DHCP configurations, or network planning.",
      faqs: [
        { question: "What does the IPv4 Range Expander do?", answer: "It expands IPv4 address ranges into individual IP addresses for network configurations." },
        { question: "Can I expand a range of IPs into a list?", answer: "Yes, the tool will generate a list of IP addresses based on the given range." },
        { question: "Is this tool free?", answer: "Yes, the IPv4 Range Expander is free to use." },
        { question: "How do I use the IPv4 Range Expander?", answer: "Enter the start and end of the IP range, and the tool will generate a list of all IP addresses in between." },
        { question: "Can I use this for CIDR ranges?", answer: "Yes, the tool can handle both standard and CIDR-formatted IP ranges." }
      ],
      keywords: "ipv4, range, list, expand, generator",
      slug: "/tool/ipv4-range",
      component: Ipv4RangeExpander
    },
    {
      name: "MAC Address Lookup",
      icon: 'Search',
      description: "The MAC Address Lookup tool lets you look up vendor information from MAC addresses. This is useful for network troubleshooting and identifying hardware manufacturers based on their MAC address.",
      faqs: [
        { question: "What can I look up with the MAC Address Lookup tool?", answer: "You can look up the vendor or manufacturer associated with a specific MAC address." },
        { question: "Is this tool free?", answer: "Yes, the MAC Address Lookup tool is free to use." },
        { question: "How accurate is the MAC address vendor information?", answer: "The tool provides accurate vendor information based on the MAC address database." },
        { question: "How do I use the MAC Address Lookup?", answer: "Enter the MAC address, and the tool will provide the associated vendor or manufacturer." },
        { question: "Can I look up MAC addresses for any device?", answer: "Yes, the tool can look up MAC addresses for most network devices and hardware." }
      ],
      keywords: "mac address, vendor, lookup, manufacturer",
      slug: "/tool/mac-lookup",
      component: MacAddressLookup
    },
    {
      name: "MAC Address Generator",
      icon: 'RefreshCw',
      description: "The MAC Address Generator generates random or vendor-specific MAC addresses. This tool is useful for network simulations, device testing, and other tasks where MAC addresses are needed.",
      faqs: [
        { question: "What is the MAC Address Generator?", answer: "It generates random or vendor-specific MAC addresses based on your preferences." },
        { question: "Can I generate MAC addresses for specific vendors?", answer: "Yes, the tool allows you to generate MAC addresses based on specific vendors." },
        { question: "Is this tool free?", answer: "Yes, the MAC Address Generator is free to use." },
        { question: "How do I generate a MAC address?", answer: "Choose whether you want a random or vendor-specific MAC address, then the tool will generate it." },
        { question: "Can I use this for network simulations?", answer: "Yes, you can use the generated MAC addresses for testing and simulations." }
      ],
      keywords: "mac address, generator, random, vendor",
      slug: "/tool/mac-generator",
      component: MacAddressGenerator
    },
    {
      name: "IPv6 ULA Generator",
      icon: 'KeySquare',
      description: "The IPv6 Unique Local Address (ULA) Generator generates IPv6 ULAs, which are used for local networks and are not routed on the public internet. This tool is valuable for network administrators working with IPv6 configurations.",
      faqs: [
        { question: "What is an IPv6 ULA?", answer: "IPv6 ULA is a unique local address used for private communication within a local network." },
        { question: "How do I use the IPv6 ULA Generator?", answer: "Click the button to generate a random IPv6 ULA address." },
        { question: "Is this tool free?", answer: "Yes, the IPv6 ULA Generator is free to use." },
        { question: "Can I use IPv6 ULAs in my local network?", answer: "Yes, ULAs are designed specifically for local use and should not be routable on the internet." },
        { question: "What is the benefit of using IPv6 ULAs?", answer: "They help organize network addressing for private communications within local networks." }
      ],
      keywords: "ipv6, ula, generator, unique local address",
      slug: "/tool/ipv6-ula",
      component: Ipv6UlaGenerator
    }
  ]
};

export default networkTools;