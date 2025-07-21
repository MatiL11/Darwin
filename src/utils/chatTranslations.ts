import React from 'react';

// Helper function to translate chat content
export const getTranslatedChatContent = (
    content: string | React.ReactNode,
    worker: string,
    industry: string,
    index: number,
    t: (key: string) => string
  ): string | React.ReactNode => {
    // Ensure worker name is lowercase for key consistency
    const workerKey = worker ? worker.toLowerCase() : '';
    
    // Build translation key based on message position in the chat sequence
    let translationKey = `worker.chats.${workerKey}.${industry}.${index}`;
    
    // Handle string content
    if(typeof content === 'string'){
      const translation = t(translationKey);
      // Return translation if it exists, otherwise return original content
      return translation !== translationKey ? translation : content;
    }
    
    // Handle React Elements (like JSX fragments)
    if (React.isValidElement(content) && content.type === React.Fragment) {
      translationKey = `worker.chats.${workerKey}.${industry}.jsx.${index}`;
      const jsxTranslation = t(translationKey);
      if (jsxTranslation !== translationKey) {
        const children = React.Children.toArray((content.props as any).children);
        const translatedChildren = children.map((child, childIndex) => {
          // Get a translation for text nodes
          if (typeof child === 'string') {
            const childTranslationKey = `${translationKey}.${childIndex}`;
            const childTranslation = t(childTranslationKey);
            return childTranslation !== childTranslationKey ? childTranslation : child;
          }
          // Anchor tags (links)
          if (React.isValidElement(child) && child.type === 'a') {
            const linkKey = `worker.chats.links.${workerKey}.${industry}`;
            const translatedLink = t(linkKey);
            const anchorProps = child.props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
            return React.createElement(
              'a',
              {
                className: anchorProps.className,
                target: anchorProps.target,
                rel: anchorProps.rel,
                href: anchorProps.href
              },
              translatedLink !== linkKey ? translatedLink : anchorProps.children
            );
          }
          return child;
        });
        // Return a new fragment with the translated children
        return React.createElement(React.Fragment, {}, ...translatedChildren);
      }
      // If no specific translation found, return the original content
      return content;
    }
    
    // Handle Anchor Tags (Links)
    if (React.isValidElement(content) && content.type === 'a') {
      // Try to find a translated link in our new structure
      const linkKey = `worker.chats.links.${workerKey}.${industry}`;
      const translatedLink = t(linkKey);
      // If we have a translation and it's not just the key echoed back
      if (translatedLink !== linkKey) {
        // Clone the anchor element with the same props but translated content
        const anchorProps = content.props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
        return React.createElement(
          'a',
          {
            className: anchorProps.className,
            target: anchorProps.target,
            rel: anchorProps.rel,
            href: anchorProps.href
          },
          translatedLink
        );
      }
      // If no translation found, return the original content
      return content;
    }
    
    // For other React components (like Audio, PDF, ContactCard), return as is
    return content;
  };