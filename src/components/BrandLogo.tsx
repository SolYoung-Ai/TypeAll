import { Image } from '@/components/ui/image';
import { SITE } from '@/config/site';
import { cn } from '@/lib/utils';

export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src={SITE.logoImg}
        alt={SITE.ownerName}
        className={cn('object-cover', compact ? 'h-8 w-8 rounded-md' : 'h-9 w-9 rounded-md')}
      />
      <span className={cn('font-semibold tracking-tight text-foreground', compact ? 'text-sm' : 'text-base')}>
        {SITE.name}
      </span>
    </span>
  );
}
