"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface UpdateFormProps {
  profile: any;
  onSubmit: (data: any) => Promise<void>;
}

export function UpdateForm({ profile, onSubmit }: UpdateFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    display_name: profile.display_name || "",
    bio: profile.bio || "",
    phone_number: profile.phone_number || "",
    country: profile.country || "",
    city: profile.city || "",
    notification_email: profile.notification_email || false,
    notification_sms: profile.notification_sms || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      router.push("/dashboard/seller/profile");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="display_name">Display Name</Label>
            <Input
              id="display_name"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" value={formData.country} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notification_email"
                name="notification_email"
                checked={formData.notification_email}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="notification_email">Receive Email Notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notification_sms"
                name="notification_sms"
                checked={formData.notification_sms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="notification_sms">Receive SMS Notifications</Label>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
