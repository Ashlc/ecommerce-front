import { Button } from "@heroui/button";
import { CaretLeftIcon, Icon } from "@phosphor-icons/react";

type Props = {
  icon?: Icon;
  title: string;
  backLink?: string;
};

const PageTitle = ({ icon, title, backLink = "../." }: Props) => {
  const Icon = icon as React.ElementType;
  return (
    <div className="flex flex-row gap-2">
      <Button
        as={"a"}
        isIconOnly
        variant="light"
        color="primary"
        radius="full"
        href={backLink}
        size="sm"
      >
        <CaretLeftIcon size={20} weight="bold" />
      </Button>
      {icon && (
        <Icon
          size={32}
          className="text-primary-500 dark:text-shadow-lg text-shadow-primary-600/15"
          weight="duotone"
        />
      )}
      <h1 className="text-primary font-heading mb-6 font-medium text-2xl dark:text-shadow-lg text-shadow-primary-500/15">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
