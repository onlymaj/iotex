<?php

namespace App\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="iotexs")
 */
class BlocksDocument
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\Field(type="string")
     *
    */
    private string $block;

    /**
     * 
     * @MongoDB\Field(type="collection")
     */
    private array $transactions;

   
    /**
     * Get the value of block
     */ 
    public function getBlock()
    {
        return $this->block;
    }

    /**
     * Set the value of block
     *
     * @return  self
     */ 
    public function setBlock($block)
    {
        $this->block = $block;

        return $this;
    }

    /**
     * Get the value of transactions
     */ 
    public function getTransactions(): array
    {
        return $this->transactions;
    }


    /**
     * Set the value of transactions
     *
     * @return  self
     */ 
    public function setTransactions($transaction): self
    {
        $this->transactions[] = $transaction;

        return $this;
    }
}