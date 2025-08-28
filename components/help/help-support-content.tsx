"use client"
import { LifeBuoy, Search, Mail, Phone, MessageSquare } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpSupportContent() {
  const faqs = [
    {
      question: "How do I add a new device?",
      answer:
        "Navigate to the 'Rooms' page, select a room, and click the '+' button in the room card header to add a new device. You can specify its name, type, and location.",
    },
    {
      question: "How can I monitor my energy consumption?",
      answer:
        "On the 'Dashboard' page, you'll find an 'Energy Consumption' card that breaks down usage by category. For detailed graphs, visit the 'Graphs' page.",
    },
    {
      question: "What do the security alerts mean?",
      answer:
        "Security alerts provide real-time notifications about events like motion detection, door/window status changes, or system arming/disarming. You can view a full log on the 'Security' page.",
    },
    {
      question: "Can I customize my dashboard layout?",
      answer: "Currently, the dashboard layout is fixed. Future updates may include customization options.",
    },
    {
      question: "How do I update my subscription plan?",
      answer:
        "You can manage your subscription details, including viewing your electricity bill, on the 'Subscription' page accessible from the sidebar.",
    },
  ]

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-4">
        <div className="flex items-center space-x-2">
          <LifeBuoy className="h-8 w-8 text-cyan-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            HELP & SUPPORT
          </span>
        </div>
      </header>

      {/* Search Bar */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">Search Help Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Label htmlFor="help-search" className="sr-only">
              Search help topics
            </Label>
            <Input
              id="help-search"
              placeholder="e.g., 'add device', 'energy usage', 'security alerts'"
              className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </CardContent>
      </Card>

      {/* Frequently Asked Questions */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-slate-700/50">
                <AccordionTrigger className="text-slate-200 hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-cyan-400" />
              <div>
                <div className="text-sm font-medium text-slate-200">Email Support</div>
                <a href="mailto:support@smarthome.com" className="text-xs text-slate-400 hover:text-cyan-400">
                  support@smarthome.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-cyan-400" />
              <div>
                <div className="text-sm font-medium text-slate-200">Phone Support</div>
                <div className="text-xs text-slate-400">+1 (800) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-cyan-400" />
              <div>
                <div className="text-sm font-medium text-slate-200">Live Chat</div>
                <div className="text-xs text-slate-400">Available 9 AM - 5 PM EST, Mon-Fri</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
