'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldGroup, FieldLabel, FieldSet, FieldError } from '@/components/ui/field'
import { useState } from 'react'
import LoadingButton from '../button/loading-button'

export default function CreateUserForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setErrors({
      password: 'Password is required',
    })
    setLoading(false)
    console.log('Form submitted')
  }

  return (
    <div className="text-card-foreground mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl leading-none font-semibold tracking-tight">Create New User</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Add a new user to the system. Fill in the details below.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" placeholder="John Doe" />
              <FieldError errors={[{ message: errors.name }]} />
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="john@example.com" />
              <FieldError errors={[{ message: errors.email }]} />
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" placeholder="••••••••" />
              <FieldError errors={[{ message: errors.password }]} />
            </Field>

            <Field data-invalid={!!errors.role}>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Select defaultValue="barber" name="role">
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="barber">Barber</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[{ message: errors.role }]} />
            </Field>

            <Field data-invalid={!!errors.gender}>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Select name="gender">
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[{ message: errors.gender }]} />
            </Field>

            <Field data-invalid={!!errors.photo}>
              <FieldLabel htmlFor="photo">Profile Photo (Optional)</FieldLabel>
              <Input id="photo" name="photo" type="file" accept="image/*" />
              <FieldError errors={[{ message: errors.photo }]} />
            </Field>
          </FieldGroup>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <LoadingButton type="submit" isLoading={loading}>
              Create User
            </LoadingButton>
          </div>
        </FieldSet>
      </form>
    </div>
  )
}
