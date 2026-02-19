"use client";

import { FadeIn, RotateIn, ScaleIn } from "@/components/animations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Exemple de combinaison d'animations :
 * FadeIn (direction up) > ScaleIn (delay) > RotateIn > Card
 */
export function AnimatedCardExample() {
  return (
    <FadeIn direction="up">
      <ScaleIn delay={0.2}>
        <RotateIn>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Carte animée</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Combinaison FadeIn + ScaleIn + RotateIn
              </p>
            </CardContent>
          </Card>
        </RotateIn>
      </ScaleIn>
    </FadeIn>
  );
}
