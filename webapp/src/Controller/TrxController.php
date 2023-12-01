<?php

namespace App\Controller;

use App\Document\BlocksDocument;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TrxController extends AbstractController
{
    public function __construct(private DocumentManager $dm)
    {
    }
    
    #[Route('/trx/{contract}', name: 'app_trx')]
    public function index(String $contract): JsonResponse
    {
        try
        {
            $totalTrx = $this->dm->createQueryBuilder(BlocksDocument::class)
                ->field('to')->equals($contract)
                ->count()->getQuery()->execute();
            
            $builder = $this->dm->getRepository(BlocksDocument::class)->createAggregationBuilder();
            $totalUaw = $builder->match()->field('to')->equals($contract)
                ->group()->field('_id')->expression('$from')->count('totals')->execute()->toArray()[0]['totals']; 

            return $this->json([
                'uawCount' => $totalUaw,
                'transactionsCount' => $totalTrx,
            ]);
        }
        catch(\Exception $e)
        {
            return $this->json([
                'content' => 'Please start the queue first !'
            ]);
        }
        
        
    }
}
