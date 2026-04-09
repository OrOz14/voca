import { RecordingButton } from '@/components/RecordingButton'
import { Button, IconButton } from '../components/core'
import { Mic, Smartphone, Repeat } from 'lucide-react'

export default function ButtonDemo() {
  return (
    <div className="min-h-screen bg-voca-bg p-8 font-primary" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-voca-text-primary mb-8">Button Component Demo</h1>
        
        {/* Primary Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-voca-text-primary">Primary Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">Small Primary</Button>
            <Button variant="primary" size="md">Medium Primary</Button>
            <Button variant="primary" size="lg">Large Primary</Button>
            <Button variant="primary" size="lg">
              <span className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Start Filling
              </span>
            </Button>
            <Button variant="primary" loading icon={<Repeat className="w-4 h-4" />}>
              Loading...
            </Button>
            <Button variant="primary" fullWidth>Full Width</Button>
          </div>
        </section>

        {/* Outline Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-voca-text-primary">Outline Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm">Small Outline</Button>
            <Button variant="outline" size="md">Medium Outline</Button>
            <Button variant="outline" size="lg">Large Outline</Button>
            <Button variant="outline" size="lg">
              <span className="flex items-center gap-2">
                <Repeat className="w-4 h-4" />
                Change Template
              </span>
            </Button>
            <Button variant="outline" loading>Loading...</Button>
          </div>
        </section>

        {/* Mic Button */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-voca-text-primary">Mic Button</h2>
          <div className="flex flex-wrap gap-4">
            <RecordingButton />
            <RecordingButton loading />
            <RecordingButton disabled />
          </div>
        </section>

        {/* Inverse Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-voca-text-primary">Inverse Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="inverse" size="sm">Small Inverse</Button>
            <Button variant="inverse" size="md">Medium Inverse</Button>
            <Button variant="inverse" size="lg">Large Inverse</Button>
            <Button variant="inverse" size="lg">
              <span className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Continue with Apple
              </span>
            </Button>
            <Button variant="inverse" loading icon={<Smartphone className="w-5 h-5" />}>
              Loading...
            </Button>
          </div>
        </section>

        {/* Disabled States */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-voca-text-primary">Disabled States</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
            <RecordingButton />
            <Button variant="inverse" disabled>Disabled Inverse</Button>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-voca-text-primary">Interactive Demo</h2>
          <div className="space-y-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => alert('Primary button clicked!')}
            >
              Click Me!
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => alert('Outline button clicked!')}
            >
              Click Me Too!
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
