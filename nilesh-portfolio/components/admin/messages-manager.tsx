"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, MailOpen, Trash2, Loader2 } from "lucide-react"
import type { ContactMessage } from "@/lib/models/contact"
import { useToast } from "@/hooks/use-toast"

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("[v0] Error fetching messages:", error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleMarkAsRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read }),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: read ? "Marked as read" : "Marked as unread",
        })
        fetchMessages()
      } else {
        toast({
          title: "Error",
          description: "Failed to update message",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error updating message:", error)
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Message deleted successfully",
        })
        fetchMessages()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete message",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error deleting message:", error)
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-highlight" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Contact Messages</h2>

      <div className="space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message._id?.toString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass rounded-lg p-6 hover:border-highlight/40 transition-colors ${
              !message.read ? "border-highlight/30" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${message.read ? "bg-secondary" : "bg-highlight/10"}`}>
                  {message.read ? (
                    <MailOpen className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Mail className="w-5 h-5 text-highlight" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{message.name}</h3>
                  <a href={`mailto:${message.email}`} className="text-sm text-highlight hover:underline">
                    {message.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkAsRead(message._id?.toString() || "", !message.read)}
                  className="p-2 text-muted-foreground hover:text-highlight transition-colors"
                  title={message.read ? "Mark as unread" : "Mark as read"}
                >
                  {message.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(message._id?.toString() || "")}
                  className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{message.message}</p>

            <div className="mt-3 text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</div>
          </motion.div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No messages yet.</p>
        </div>
      )}
    </div>
  )
}
