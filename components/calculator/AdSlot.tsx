'use client';

interface AdSlotProps {
  id?: string;
  size?: 'banner' | 'rectangle' | 'leaderboard' | 'square';
  className?: string;
}

/**
 * AdSlot — placeholder reserved for Google AdSense ad units.
 *
 * ACTIVATION: Once AdSense is approved, replace the `return null` below with
 * the <ins class="adsbygoogle"> block supplied by AdSense for each slot ID.
 * Also set NEXT_PUBLIC_ADSENSE_CLIENT_ID in your environment variables.
 *
 * Slot sizes for reference:
 *   banner / leaderboard : 728×90
 *   rectangle            : 300×250
 *   square               : 250×250
 */
export default function AdSlot({ id: _id, size: _size, className: _className }: AdSlotProps) {
  return null;
}
