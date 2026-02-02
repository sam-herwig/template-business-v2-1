import { notFound } from 'next/navigation';
import { getTemplateBySlug, templates } from '@/lib/templates';
import TemplateDetail from '@/components/TemplateDetail';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const template = getTemplateBySlug(params.slug);
  
  if (!template) {
    return {
      title: 'Template Not Found | LaunchKit',
    };
  }

  return {
    title: `${template.name} - ${template.category} Template | LaunchKit`,
    description: template.longDescription,
    openGraph: {
      title: `${template.name} | LaunchKit`,
      description: template.description,
      type: 'website',
    },
  };
}

export default function TemplateDetailPage({ params }: PageProps) {
  const template = getTemplateBySlug(params.slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetail template={template} />;
}
