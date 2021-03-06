<?php

require_once __DIR__ . '/../../model/mediamanager/mediamanager.class.php';

class MediaManagerCategoriesProcessor extends modProcessor
{

    private $mediaManager = null;

    public function checkPermissions()
    {
        return $this->modx->hasPermission('file_manager');
    }

    public function process()
    {
        $this->mediaManager = $this->modx->getService('mediamanager', 'MediaManager', $this->modx->getOption('mediamanager.core_path', null, $this->modx->getOption('core_path') . 'components/mediamanager/') . 'model/mediamanager/');

        $method = $this->getProperty('method');
        $data   = array();

        switch ($method) {
            case 'create':
                $data = $this->create();

                break;
            case 'edit':
                $data = $this->edit();

                break;
            case 'delete':
                $data = $this->delete();

                break;
            case 'sort':
                $data = $this->sort();

                break;
            case 'getCategoriesByName':
                $data = $this->getCategoriesByName();

                break;
            case 'getTree':
                $data = $this->getTree();

                break;
        }

        return $this->outputArray($data);
    }

    private function create()
    {
        return $this->mediaManager->categories->createCategory($this->getProperty('name'), $this->getProperty('parent'), $this->getProperty('source'));
    }

    private function edit()
    {

        return $this->mediaManager->categories->editCategory($this->getProperty('category_id'), $this->getProperty('name'));
    }

    private function delete()
    {
        return $this->mediaManager->categories->deleteCategory($this->getProperty('category_id'), $this->getProperty('move_to'));
    }

    private function sort()
    {
        return $this->mediaManager->categories->sortCategories($this->getProperty('items'));
    }

    private function getCategoriesByName()
    {
        return $this->mediaManager->categories->getCategoriesByName($this->getProperty('search'));
    }

    private function getTree()
    {
        return $this->mediaManager->categories->getCategoryTree($this->getProperty('selected'));
    }
}

return 'MediaManagerCategoriesProcessor';
