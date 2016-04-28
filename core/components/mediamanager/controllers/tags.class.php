<?php

require_once __DIR__ . '/index.class.php';

class MediaManagerTagsManagerController extends MediaManagerManagerController
{

    public function process(array $scriptProperties = array())
    {
        /**
         * Base tags are disabled for this project.
         */
        return false;

        $placeholders = [
            'pagetitle'          => $this->getPageTitle(),
            'create_title'       => $this->modx->lexicon('mediamanager.tags.title'),
            'create_label'       => $this->modx->lexicon('mediamanager.tags.label'),
            'create_placeholder' => $this->modx->lexicon('mediamanager.tags.placeholder'),
            'create_button'      => $this->modx->lexicon('mediamanager.tags.button'),
            'list'               => $this->mediaManager->tags-> getList(),
            'token'              => $this->modx->user->getUserToken($this->modx->context->get('key')),
        ];

        $this->setPlaceholders(array_merge($placeholders, $this->mediaManager->config));
    }

    public function getPageTitle()
    {
        return $this->modx->lexicon('mediamanager.tags');
    }
    public function getTemplateFile()
    {
        /**
         * Base tags are disabled for this project.
         */
        return false;
        
        return $this->mediaManager->config['templatesPath'] . 'tags.tpl';
    }

    public function loadCustomCssJs()
    {
        $this->addJavascript($this->mediaManager->config['js_url'] . 'mgr/mediamanager-tags.js');
    }
    
}